import { IButtonType } from "../../common/interfaces/common.interface";
import InteractionButton from "../InteractionButton";
import "./index.scss";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";

interface CardProps {
  users?: boolean;
  children?: React.ReactElement;
  team?: boolean;
  heading?: string;
  username?: string;
  userInfo?: boolean;
  handleUserDialog?: any;
  handleViewUserInfoDialog?: any;
}
const Card = (props: CardProps) => {
  const navigate = useNavigate();
  const {
    users,
    children,
    team,
    heading,
    username,
    userInfo,
    handleUserDialog,
    handleViewUserInfoDialog,
  } = props;
  return (
    <div className="card-container">
      <div className="card-header">
        {username && (
          <span className="username">
            <span onClick={() => navigate("/users/individualusers")}>
              <ArrowBackIosNewIcon className="icon" color="action" />
            </span>
            {username}
          </span>
        )}
        {heading && (
          <span className="header-title">
            <>{heading}</>
          </span>
        )}
        {users && (
          <InteractionButton
            value="Add User"
            onClick={() => handleUserDialog()}
            className="add-user-btn"
            isLoading={false}
            type={IButtonType.DARK}
          />
        )}
        {team && (
          <InteractionButton
            value="Add Team"
            onClick={() => handleViewUserInfoDialog()}
            className="add-user-btn"
            isLoading={false}
            type={IButtonType.DARK}
          />
        )}
        {userInfo && (
          <div className="view-user-btn">
            <InteractionButton
              value="View User Info"
              onClick={() => handleViewUserInfoDialog()}
              className="add-user-btn"
              isLoading={false}
              type={IButtonType.DARK}
            />
          </div>
        )}
      </div>
      {!userInfo && <hr />}
      <div className="card-body">{children}</div>
    </div>
  );
};

export default Card;
