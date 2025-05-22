interface User {
    id: number;
    name: string;
    email: string;
}

import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => ({
        users: [
            { id: 1, name: "Sai Krishna", email: "sai@example.com" },
            { id: 2, name: "Ayesha Khan", email: "ayesha@example.com" },
            { id: 3, name: "John Doe", email: "john@example.com" },
            { id: 4, name: "Jane Smith", email: "jane@example.com" },
        ] as User[],
    }),
    actions: {
        addUser(user: User) {
            this.users.push(user);
        },
        deleteUser(id: number) {
            this.users = this.users.filter((user) => user.id !== id);
        },
        updateUser(updatedUser: User) {
            const index = this.users.findIndex((user) => user.id === updatedUser.id);
            if (index !== -1) this.users[index] = updatedUser;
        },
        getUserById(id: number): User | undefined {
            return this.users.find((user) => user.id === id);
        },
    },
});
