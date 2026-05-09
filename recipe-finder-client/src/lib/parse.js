import Parse from "parse";

Parse.serverURL = "https://parseapi.back4app.com/";

Parse.initialize(
  import.meta.env.VITE_BACK4APP_APP_ID,
  import.meta.env.VITE_BACK4APP_JS_KEY,
);

export default Parse;
