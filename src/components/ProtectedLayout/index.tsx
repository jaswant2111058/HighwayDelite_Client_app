import { lazy, Suspense, useEffect } from "react";
import "./index.scss";

//global state
import { IDialogDetails } from "../../common/interfaces/dialog.interface";
import useDialogStore from "../../store/dialogStore";

//components
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { IAuthStore, useAuthStore } from "../../store/authStore";
import Icon from "../../utils/icon";
import UserModels from "../../pages/UserManagement/UserModels";
import Dialog from "../Dialog";
import Sidebar from "../Sidebar";
import UserMedia from "../../pages/MediaManagement/MIndividualUsers/UserMedia";

const UIndividualUsers = lazy(
  () => import("../../pages/UserManagement/UIndividualUsers"),
);
const Dashboard = lazy(() => import("../../pages/Dashboard"));
const UTeamUsers = lazy(() => import("../../pages/UserManagement/UTeamUsers"));
const Admin = lazy(() => import("../../pages/Admin"));
const TransactionManagement = lazy(
  () => import("../../pages/TransactionManagement"),
);
const MIndividualUsers = lazy(
  () => import("../../pages/MediaManagement/MIndividualUsers"),
);
const MTeamUsers = lazy(() => import("../../pages/MediaManagement/MTeamUsers"));
const CMS = lazy(() => import("../../pages/Cms"));
const Settings = lazy(() => import("../../pages/Settings"));

const ProtectedLayout = () => {
  const navigate = useNavigate();
  const {
    className,
    type,
    showCloseIcon,
    showDialog,
    title,
    content,
    buttons,
    onClickCloseIcon,
    customStyle,
  } = useDialogStore() as IDialogDetails;

  const { accessToken } = useAuthStore() as IAuthStore;

  useEffect(() => {
    if (!accessToken) navigate("/login");
  }, [accessToken]);

  return (
    <div className="main-container">
      <div className="main-container__sidebar">
        <Sidebar />
      </div>
      <div className="main-container__layout">
        <Suspense
          fallback={
            <div
              style={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon src="loader" />
            </div>
          }
        >
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="/" element={<Navigate to="dashboard" />} />
            {/* User management */}
            <Route
              path="users/individualusers"
              element={<UIndividualUsers />}
            />
            <Route
              path="users/individualusers/:username"
              element={<UserModels />}
            />

            <Route path="users/teamusers" element={<UTeamUsers />} />
            <Route path="users" element={<Navigate to="individualusers" />} />
            {/* Admin */}
            <Route path="admin" element={<Admin />} />
            {/* Transaction Management */}
            <Route path="transaction" element={<TransactionManagement />} />
            {/* Media management */}
            <Route
              path="media/individualusers"
              element={<MIndividualUsers />}
            />
            <Route
              path="media/individualusers/:username"
              element={<UserMedia />}
            />
            <Route path="media/teamusers" element={<MTeamUsers />} />
            <Route path="media" element={<Navigate to="individualusers" />} />
            {/* CMS */}
            <Route path="cms" element={<CMS />} />
            {/* Settings */}
            <Route path="settings" element={<Settings />} />
          </Routes>
        </Suspense>
      </div>

      {/* Dialog Box */}
      <Dialog
        className={`xen-capture__dialog ${className}`}
        type={type}
        showCloseIcon={showCloseIcon}
        showDialog={showDialog}
        title={title}
        content={content}
        buttons={buttons}
        onClickCloseIcon={onClickCloseIcon}
        customStyle={customStyle}
      />
    </div>
  );
};

export default ProtectedLayout;
