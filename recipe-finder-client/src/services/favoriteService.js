import Parse from "../lib/parse";

const getFavoriteClass = () => Parse.Object.extend("Favorite");

export const fetchFavorites = async () => {
  const user = Parse.User.current();
  if (!user) return [];

  const Favorite = getFavoriteClass();
  const query = new Parse.Query(Favorite);
  query.equalTo("user", user);
  query.descending("createdAt");
  return await query.find();
};

export const addFavorite = async ({ mealId, mealName, mealThumb }) => {
  const user = Parse.User.current();
  if (!user) throw new Error("Not authenticated");

  const Favorite = getFavoriteClass();
  const fav = new Favorite();
  fav.set("mealId", mealId);
  fav.set("mealName", mealName);
  fav.set("mealThumb", mealThumb);
  fav.set("user", user);

  // ACL ensures only this user can read/write their own favorite
  const acl = new Parse.ACL(user);
  fav.setACL(acl);

  return await fav.save();
};

export const removeFavorite = async (mealId) => {
  const user = Parse.User.current();
  const Favorite = getFavoriteClass();
  const query = new Parse.Query(Favorite);
  query.equalTo("user", user);
  query.equalTo("mealId", mealId);
  const fav = await query.first();
  if (fav) await fav.destroy();
};
