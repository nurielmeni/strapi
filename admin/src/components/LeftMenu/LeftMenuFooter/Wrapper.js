import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  background: ${(props) => props.theme.main.colors.strapi['blue-darker']};
  bottom: 0;
  .maintenanceAction {
    display: flex;
    flex-direction: column;
    padding: 10px 15px;
    gap: 6px;

    button {
      width: 100%;
      border: 0;
      border-radius: 4px;
      padding: 8px 10px;
      font-size: 12px;
      font-weight: 600;
      color: #0f2a46;
      background: #d9ecff;
      cursor: pointer;

      &:disabled {
        opacity: 0.65;
        cursor: not-allowed;
      }
    }

    small {
      color: ${({ theme }) => theme.main.colors.strapi['gray-light']};
      line-height: 1.25;
    }
  }

  .poweredBy {
    width: 100%;
    bottom: 0;
    height: 3rem;
    padding-left: 15px;
    padding-right: 15px;
    line-height: 3rem;
    background-color: rgba(255, 255, 255, 0.02);
    font-size: 1rem;
    font-weight: 400;
    letter-spacing: 0.05rem;
    vertical-align: middle;
    color: ${({ theme }) => theme.main.colors.strapi['gray-light']};
  }
`;

const A = styled.a`
  &:hover {
    color: #007bff;
    text-decoration: underline;
  }
`;

Wrapper.defaultProps = {
  theme: {
    main: {
      colors: {
        strapi: {}
      },
      sizes: {
        header: {},
        leftMenu: {}
      }
    }
  }
};

Wrapper.propTypes = {
  theme: PropTypes.object
};

export default Wrapper;
export { A };
