import { useState } from 'react';
import axios from 'axios';

axios.defaults.baseURL = '';

export const useAxios = () => {
	const [response, setResponse] = useState(undefined);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(null);

	const operation = async (params) => {
		try {
			setLoading(true);
			setError(null);
			const result = await axios.request(params);
			setResponse(result.data);
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	return { response, error, loading, operation };
};
