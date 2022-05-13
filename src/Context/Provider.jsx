import { ThemeProvider, UserProvider, LikedProvider, BookmarkProvider, AuthProvider } from './index';

const Providers = ({ children }) => {
	return (
		<ThemeProvider>
			<AuthProvider>
				<UserProvider>
					<BookmarkProvider>
						<LikedProvider>{children}</LikedProvider>
					</BookmarkProvider>
				</UserProvider>
			</AuthProvider>
		</ThemeProvider>
	);
};

export { Providers };
