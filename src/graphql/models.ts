export type UserModel = {
    id: number;
    user_uuid: string;
    user_name: string;
    college: string| null;
    grade: number| null;
    mobile: string| null;
    email: string;
    image_url: string | null;
    registered: boolean;
};

export type TeamModel = {
    id: number;
    team_name: string;
    team_code: string | null;
    event_id: number;
    members?: UserModel[];
};

