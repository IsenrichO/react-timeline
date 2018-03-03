// @flow
import React              from 'react';
import PropTypes          from 'prop-types';
import { css }            from 'emotion';
import styled             from 'react-emotion';
import { get } from 'lodash';
import { withStyles }     from 'material-ui/styles';
import { DialogTitle }    from 'material-ui/Dialog';
import Typography         from 'material-ui/Typography';
import TimelineDialogPure from './TimelineDialog.Pure';

/* BASIC USAGE */
const Basic = ({ className }) => (
  <div className={className}>Some text</div>
);

Basic.propTypes = {
  className: PropTypes.string.isRequired,
};

export const Fancy = styled(Basic)`
  color: hotpink;
`;

/* FIXED BAR */
export const FixedBar = styled('div')(({ theme: { colors } }) => css`
  background-color: ${colors.grey.granite};
  bottom: 0;
  position: fixed;
  width: 100%;
`);

/* DIALOG TITLE */
type DialogTitleProps = {
  className?: string,
  disableTypography?: boolean,
  id: string,
  title: string,
};

export const EnhancedDialogTitle = ({
  className,
  disableTypography,
  id,
  title,
  typographyProps,
  ...rest
}: DialogTitleProps) => (
  <DialogTitle
    children={!!disableTypography
      ? (
        <Typography
          noWrap
          classes={{ ['root' || get(typographyProps, 'variant', 'display2')]: className }}
          headlineMapping={{ display2: 'h2' }}
          variant="display2"
        >
          {title}
        </Typography>
      )
      : title
    }
    classes={{ root: className }}
    className={className}
    disableTypography={disableTypography}
    id={id}
    {...rest}
  />
);

EnhancedDialogTitle.displayName = 'EnhancedDialogTitle';

EnhancedDialogTitle.propTypes = {
  className: PropTypes.string,
  disableTypography: PropTypes.bool,
  id: PropTypes.string.isRequired,
  title: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
  typographyProps: PropTypes.object,
};

EnhancedDialogTitle.defaultProps = {
  className: null,
  disableTypography: true,
  typographyProps: null,
};

// ${({ theme }) => theme.colors.white.primary};
export const StyledDialogTitle = styled(EnhancedDialogTitle)`
  color: #FFFFFF;
`;


/* COMPILED DEFAULT EXPORT */
// export {
//   Fancy,
//   FixedBar,
//   StyledDialogTitle,
// };

const styles = ({ colors, keywords }) => ({
  dialogTitle: {
    color: `${colors.white.primary} ${keywords.important}`,
  },
});

export default withStyles(styles)(TimelineDialogPure);
