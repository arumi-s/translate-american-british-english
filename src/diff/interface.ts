export interface Change {
	newValue: string;
	oldValue: string;
	added: boolean;
	removed: boolean;
}

export interface Component {
	newCount: number;
	oldCount: number;
	added: boolean;
	removed: boolean;
}

export interface Path {
	newPos: number;
	components: Component[];
}
