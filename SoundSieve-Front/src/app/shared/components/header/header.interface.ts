export interface Header {
    title: string,
    main: Navigator[],
    links: Navigator[],
    buttons?: Navigator[],
    profile?: Navigator
}

export interface Navigator {
    title: string,
    url?: string,
    type?: string,
    childs?: Navigator[],
}
