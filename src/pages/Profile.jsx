import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Button from "../components/ui/Button";
import LabeledInput from "../components/ui/LabeledInput";
import { useState } from "react";
import {
  useReauthenticate,
  useUpdateCredentials,
} from "../features/authentication/useUpdateCredentials";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

const StyledProfile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  height: 100%;
`;

const Tiles = styled.div`
  /* cursor: pointer; */
  display: grid;
  gap: 2.4rem;
  height: 100%;

  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Tile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: var(--theme-black-250);
  width: 100%;
  min-height: 100%;
  height: max-content;
  padding: 2.4rem;
  border-radius: var(--default-radius);
  filter: grayscale(40%);
  transition: filter 200ms;
  &:hover {
    filter: grayscale(0%);
  }

  & header {
  }
`;

const EmptyTitle = styled(Tile)`
  background-color: var(--theme-black-200);
`;

const TileSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
  padding-bottom: 1rem;
  /* border-bottom: 1px solid var(--theme-black-400); */
  &:last-child {
    margin-top: 1rem;
    border-bottom: none;
  }
`;

const OutlinedTile = styled(Tile)`
  background-color: transparent;
  outline: var(--theme-black-250) 2px solid;
`;

// end of Form components

function Profile() {
  const {
    reauth,
    isLoading: isReauth,
    isReauthenticating,
    setIsReauthenticating,
  } = useReauthenticate();
  const { update, isUpdating } = useUpdateCredentials();

  const { user } = useUser();
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [nonce, setNonce] = useState("");

  async function handleSubmitUpdateCredentials(e) {
    e.preventDefault();
    const newCredentials = { nonce };

    if (newEmail) newCredentials.email = newEmail;
    if (newPassword) newCredentials.password = newPassword;
    update(newCredentials);
    // TODO: fix bug (dont set to true if there was an error.)
    setNewEmail("");
    setNewPassword("");
  }

  function handleRequestReauth(e) {
    e.preventDefault();
    reauth();
    // TODO: fix bug (dont set to true if there was an error.)
    setIsReauthenticating(true);
  }

  return (
    <StyledProfile>
      <h1>Hi, {user.email}!</h1>
      <Tiles>
        <OutlinedTile
          style={{
            filter: "blur(2px) grayscale(100%)",
            pointerEvents: "none",
          }}
        >
          <header>
            <h2>Your Profile</h2>
            <p>Change your nickname.</p>
          </header>
          <TileSection>
            <LabeledInput>Your nickname</LabeledInput>
            <Button btnType="primary">Change your nickname</Button>
          </TileSection>
        </OutlinedTile>
        <NavLink
          to="/settings"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <Tile>
            <header>
              <h2>Change Settings</h2>
              <p>Change display lanuage, theme, timezone, and others.</p>
            </header>
          </Tile>
        </NavLink>
        <OutlinedTile style={{ gridRow: "span 2" }}>
          <header>
            <h2>Change Credentials</h2>
            <p>Change the password or email address you use to log in.</p>
            <small>
              You can update your password and email address at the same time.
            </small>
          </header>
          <form
            onSubmit={
              !isReauthenticating
                ? handleRequestReauth
                : handleSubmitUpdateCredentials
            }
          >
            {isReauthenticating ? (
              <TileSection>
                <LabeledInput
                  value={nonce}
                  placeholder="123456"
                  onChange={(e) => setNonce(e.target.value)}
                >
                  Confirmation Code (check your inbox!)
                </LabeledInput>
                <Button
                  onClick={handleSubmitUpdateCredentials}
                  btnType="primary"
                >
                  Confirm new credentials
                </Button>
              </TileSection>
            ) : (
              <>
                <TileSection>
                  <h3>Update Password</h3>

                  <LabeledInput
                    placeholder="••••••••"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    autoComplete={"off"}
                  >
                    New Password
                  </LabeledInput>
                  <Button btnType="secondary">Update your password</Button>
                </TileSection>
                <TileSection>
                  <h3>Change E-mail Address</h3>
                  <LabeledInput
                    value={newEmail}
                    placeholder="your.new.email@example.com"
                    onChange={(e) => setNewEmail(e.target.value)}
                  >
                    New E-mail
                  </LabeledInput>
                  <Button btnType="secondary">Change your e-mail</Button>
                </TileSection>
              </>
            )}
          </form>
        </OutlinedTile>
        <EmptyTitle></EmptyTitle>
        <EmptyTitle></EmptyTitle>
        <EmptyTitle></EmptyTitle>
        <EmptyTitle></EmptyTitle>
        <EmptyTitle></EmptyTitle>
      </Tiles>
    </StyledProfile>
  );
}

export default Profile;
