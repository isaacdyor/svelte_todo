import { writable } from "svelte/store";

export var profiles = writable([]);

export var activeUser = writable({});

export var investments = writable([]);