import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const IconWrapper = styled.div`
  width: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`;

const LoadingIcon = (props) => {
  return (
    <IconWrapper>
      <CircularProgress style={{ color: props.color, width: 24, height: 24 }} />
    </IconWrapper>
  );
};

const Container = styled.div`
  position: fixed;
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  display: flex;
  flex-direction: row;
  left: 50%;
  z-index: 9;
  justify-content: flex-start;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  height: 60px;
  width: 100%;
  bottom: 30px;
  max-width: 300px;
  margin-left: -150px;
  background-color: ${(props) => props.background};
  border-radius: 4px;
  ${(props) =>
    props.isVisible
      ? `
  {
    -webkit-animation: fadein 0.5s;
    animation: fadein 0.5s;
}

@-webkit-keyframes transform {
    from {bottom: 0; opacity: 0;} 
    to {bottom: 30px; opacity: 1;}
}

@keyframes fadein {
    from {bottom: 0; opacity: 0;}
    to {bottom: 30px; opacity: 1;}
}
`
      : `
      -webkit-animation: fadeout 0.5s 2.5s;
      animation:  fadeout 0.5s 2.5s;
      @-webkit-keyframes fadeout {
        from {bottom: 30px; opacity: 1;}
        to {bottom: 0; opacity: 0;}
    }}
    
      @keyframes fadeout {
          from {bottom: 30px; opacity: 1;}
          to {bottom: 0; opacity: 0;}
      }}`}
`;

const Text = styled.p`
  color: ${(props) => props.color};
`;

export const Snackbar = (props) => {
  return (
    <Container isVisible={props.isVisible} background={props.colors.snackbar}>
      {props.text === 'Loading' ? (
        <LoadingIcon color={props.colors.reverseText} />
      ) : null}
      <Text color={props.colors.reverseText}>{props.text}</Text>
    </Container>
  );
};
