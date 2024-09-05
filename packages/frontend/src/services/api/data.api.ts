import { DataObject } from '@charts-react-express/backend/src/models/data.model';

// TODO: move these somewhere more global
const API_ROOT = '/api';

export class DataApi {
    static DATA_URL = `${API_ROOT}/data`;

    static async fetchData(): Promise<DataObject[]> {
        // TODO: use a library such as axios
        try {
            const response = await fetch(DataApi.DATA_URL);

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            const dataItems: DataObject[] = await response.json();

            // Return the validated data
            return dataItems as DataObject[];

        } catch (error) {
            console.error('Failed to fetch data:', error);
            throw error;
        }
    }
}