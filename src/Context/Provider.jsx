import { LikedProvider, BookmarkProvider } from './index';

const Providers = ({ children }) => {
	return (
		<BookmarkProvider>
			<LikedProvider>{children}</LikedProvider>
		</BookmarkProvider>
	);
};

export { Providers };
