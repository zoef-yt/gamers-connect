import { createContext, useContext, useEffect, useState } from 'react';
import { getAllUsers } from '../../Firebase/FirebaseFirestore';

const UserContext = createContext();

const UserProvider = ({ children }) => {
	const [allUsers, setAllUsers] = useState([]);
	const [triggerUseEffect, setTriggerUseEffect] = useState(false);
	useEffect(() => {
		getAllUserHandler();
	}, [triggerUseEffect]);
	const getAllUserHandler = async () => {
		const users = await getAllUsers();
		setAllUsers(users);
	};
	return <UserContext.Provider value={{ allUsers, setTriggerUseEffect }}>{children}</UserContext.Provider>;
};

const useUser = () => useContext(UserContext);

export { UserProvider, useUser };
