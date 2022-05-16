import { UserProvider, LikedProvider, BookmarkProvider } from './index';

const Providers = ({ children }) => {
	return (
		<UserProvider>
			<BookmarkProvider>
				<LikedProvider>{children}</LikedProvider>
			</BookmarkProvider>
		</UserProvider>
	);
};

export { Providers };
