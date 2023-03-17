import styled from 'styled-components';


export const ClaimLandingContainer = styled.div`
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
`;

export const ClaimLandingToolbar = styled.div`
    background-color: ${props => props.theme.backgroundDark};
    height: 37px;
    width: 100%;
    padding: 0;
    border-bottom: solid 1px ${props => props.theme.onBackground};

    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-content: center;
`;

export const HeaderSwitchToolbar = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-content: center;
`;

export const Toolbuttons = styled.div`
    height: 36px;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-content: center;
`;
export const ClaimLandingHeader = styled.section`
    width: 100%;
    height:100%;
    padding: .5em;
    margin: 0;
    border: none;
    margin-bottom: .5em;
    background-color: ${props => props.theme.backgroundColor};
    height: calc(100% - 25px);
`;
export const Title = styled.div`
    display: flex;
    padding: 12px;
    font-weight: bold;
`;

export const GridContainer = styled.div`
    width: 100%;
    padding:0px 10px 0px 10px;
    height:100%
`;
