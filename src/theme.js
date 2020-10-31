import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { teal, yellow } from '@material-ui/core/colors';

let theme = createMuiTheme({
	palette: {
		primary: teal,
		secondary: yellow,
	},
});

theme = responsiveFontSizes(theme);

export default theme;
