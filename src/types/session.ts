type SessionContextType = {
    // login: (user: LoginUserDto) => void;
    signup: () => void;
    refreshToken: () => void;
    logout: () => void;
    currentProjectId: string;
    setCurrentProjectId: (projectId: string) => void;

}