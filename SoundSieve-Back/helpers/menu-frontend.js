const getMenuFrontend = (role = "USER_ROLE") => {
  const menu = {
    title: "SoundSieve",
    main: [
      { title: "Join SoundSieve", url: "/es" },
      { title: "Explore", url: "/browse" },
    ],
    links: [
      {
        title: "My music sheets",
        url: "/browse/my-music-sheets",
        childs: [
          { title: "Add new sheet", url: "/browse/my-music-sheets/add" },
        ],
      }
    ],
    buttons: [ 
      { title: "Sign in", url: "/auth/sign-in", type: 'btn btn-light btn-r' },
      { title: "Sign up", url: "/auth/sign-up", type: 'btn btn-light btn-reverse' },
    ],
    profile: 
    { title: "Profile",
      url: "/profile",
      childs: [{ title: "Logout" }],
    },
  };

  if (role === "USER_ROLE") {
    menu.links.unshift({ title: "Pricing", url: "/es/pricing" });

  }
  if (role === "ADMIN_ROLE") {
    menu.links.unshift(
      {
        title: "User management",
        url: "/management/users",
      },
    );
  }

  return menu;
};

module.exports = {
  getMenuFrontend,
};
