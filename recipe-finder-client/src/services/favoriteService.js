import api, { getAuthHeaders, getCurrentUser } from "../lib/parseRest";

const classPath = "/classes/Favorite";

export const fetchFavorites = async () => {
  const user = getCurrentUser();
  if (!user) return [];

  const where = JSON.stringify({
    user: { __type: "Pointer", className: "_User", objectId: user.objectId },
  });
  const res = await api.get(`${classPath}`, {
    params: { where, order: "-createdAt" },
    headers: getAuthHeaders(),
  });
  return res.data.results || [];
};

export const addFavorite = async ({ mealId, mealName, mealThumb }) => {
  const user = getCurrentUser();
  if (!user) throw new Error("Not authenticated");

  const body = {
    mealId,
    mealName,
    mealThumb,
    user: { __type: "Pointer", className: "_User", objectId: user.objectId },
    ACL: { [user.objectId]: { read: true, write: true } },
  };

  const res = await api.post(`${classPath}`, body, {
    headers: getAuthHeaders(),
  });
  return { ...body, ...res.data };
};

export const removeFavorite = async (mealId) => {
  const user = getCurrentUser();
  if (!user) return;

  const where = JSON.stringify({
    user: { __type: "Pointer", className: "_User", objectId: user.objectId },
    mealId,
  });
  const res = await api.get(`${classPath}`, {
    params: { where, limit: 1 },
    headers: getAuthHeaders(),
  });
  const results = res.data.results || [];
  if (results.length) {
    const objId = results[0].objectId;
    await api.delete(`${classPath}/${objId}`, { headers: getAuthHeaders() });
  }
};
