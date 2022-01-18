/**
 * you can defined users here
 * enter your username ex github, gitlab, etc username
 * enter your avatar url (optional)
 */

export type UserProps = {
  username: string;
  avatar?: string;
  bio?: string;
};

export const USERS: Array<UserProps> = [
  {
    username: "usamahbass",
    avatar: "https://avatars.githubusercontent.com/u/56109283?v=4",
    bio: "wake up, junior needs a lot of experience.",
  },
];
