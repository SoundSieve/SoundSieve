import { Header } from './header.interface';

export const DEFAULT_HEADER: Header = {
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
          { title: "Project list", url: "/browse/my-music-sheets", type: 'new-project-icon', img: "../../../../assets/images/svg/list.svg", },
          { title: "Create new project", url: "/browse/my-music-sheets/add", type: 'new-project-icon',img: "../../../../assets/images/svg/NewProject.svg", },
        ],
      }
    ],
    buttons: [ 
      { title: "Sign in", url: "/auth/sign-in", type: 'btn btn-light btn-r' },
      { title: "Sign up", url: "/auth/sign-up", type: 'btn btn-light btn-reverse' },
    ],
    profile: 
    { title: "Profile",
      childs: [
        { title: "View profile", url: 'browse/my-profile' },
        { title: "Logout" },
      ],
    },
}