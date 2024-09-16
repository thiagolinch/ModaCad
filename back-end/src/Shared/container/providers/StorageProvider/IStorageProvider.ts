

interface IStorageProvider {
    save(file: string, folder: string): Promise<string>;
	delete(file: string, folder: string): Promise<void>;
    get(image_name: string, folder: string): Promise<string>;
}

export { IStorageProvider }