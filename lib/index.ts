import { promises as fs, readdirSync } from "fs";
import path from "path";

class AssetManager {
    loaded: boolean;
    data: Record<string, string>;

    constructor(public dir: string) {
        this.loaded = false;
        this.data = {};
    }

    async load() {
        const files = await fs.readdir(this.dir);

        for (const file of files) {
            const name = (file.split(".").shift() ?? file).toUpperCase();
            this.data[name] = `${this.dir}/${file}`;
        }

        this.loaded = true;
    }

    loadSync() {
        const files = readdirSync(this.dir);

        for (const file of files) {
            const name = (file.split(".").shift() ?? file).toUpperCase();
            this.data[name] = `${this.dir}/${file}`;
        }

        this.loaded = true;
    }

    clear() {
        this.data = {};
        this.loaded = false;
    }

    get(name: string) {
        return this.data[name];
    }
    
    set(name: string, data: string) {
        return this.data[name.toUpperCase()] = data;
    }
    
    get size() {
        return Object.keys(this.data).length;
    }
}

export = {
    font: new AssetManager(path.join(__dirname, "..", "data", "fonts")),
    image: new AssetManager(path.join(__dirname, "..", "data", "images")),
    utils: {
        AssetManager
    }
};
