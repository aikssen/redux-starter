import config from '../../env';

const apiUrl = config.apiUrl;
const Config = {
	api: {
		createUserURL: `${apiUrl}/users/create`
	}
};

export default Config;
