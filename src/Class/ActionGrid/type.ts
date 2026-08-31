export type ActionItem = {
    id: string;
    label: string;
    color: string;

    icon?: string;
    image?: string;

    disabled?: boolean;
    nameFunction?: string;
};

export type ActionGridJSON = {
    actions: ActionItem[];
};