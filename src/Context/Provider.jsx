import { ThemeProvider, UserProvider, LikedProvider, BookmarkProvider } from './index';

const Providers = ({ children }) => {
	return (
		<ThemeProvider>
			<UserProvider>
				<BookmarkProvider>
					<LikedProvider>{children}</LikedProvider>
				</BookmarkProvider>
			</UserProvider>
		</ThemeProvider>
	);
};

export { Providers };
