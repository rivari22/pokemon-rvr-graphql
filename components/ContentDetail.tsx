import styled from "@emotion/styled";
import React, { useContext, useMemo, useState } from "react";
import { PokemonContext } from "../context/AppPokemonContext/context";
import { PokemonEnumActionType } from "../context/AppPokemonContext/reducer";
import { IDetailPokemon } from "../pages/detail/[name]";
import { probabilityAddPokemon } from "../utils/probabilityAddPokemon";
import AboutDetail from "./AboutDetail";
import BaseStatsDetail from "./BaseStatsDetail";
import { Loading } from "./Loading";
import { Modal } from "./Modal";

const ContainerContent = styled.section`
  min-width: 400px;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  background-color: #ffffff;
  min-height: 50vh;
  max-height: 100vh;
  padding: 60px 20px;
`;

const ButtonStyled = styled.button`
  background-color: white;
  display: flex;
  margin: 10px 0 0 0;
  border-radius: 6px;
  justify-content: end;
`;

interface ITabStyled {
  isTabActive: boolean;
}

const TabStyled = styled.div`
  padding-bottom: 20px;
  border-bottom-width: 2px;
  border-color: #aab3eb;
  border-bottom-style: ${(props: ITabStyled) =>
    props.isTabActive ? "solid" : "none"};
  color: ${(props: ITabStyled) => (props.isTabActive ? "black" : "#E0E0E2")};
`;

const Tab = ({
  tabActive,
  setTabActive,
}: {
  tabActive: string;
  setTabActive: React.Dispatch<React.SetStateAction<"about" | "baseStats">>;
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        borderBottomStyle: "solid",
        borderBottomWidth: 1,
        borderColor: "#e1e4f2",
      }}
    >
      <TabStyled
        className="hoverPointer"
        isTabActive={tabActive === "about"}
        onClick={() => setTabActive("about")}
      >
        About
      </TabStyled>
      <TabStyled
        className="hoverPointer"
        isTabActive={tabActive === "baseStats"}
        onClick={() => setTabActive("baseStats")}
      >
        Base Stats
      </TabStyled>
    </div>
  );
};

const ContentDetail = (props: IDetailPokemon) => {
  const { state: statePokemon, dispatch: dispatchPokemon } =
    useContext(PokemonContext);
  const [tabActive, setTabActive] = useState<"about" | "baseStats">("about");
  const [modal, setModal] = useState({
    open: false,
    success: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const dataAboutTab = useMemo(() => {
    return [
      {
        label: "Species",
        value: props.species.name,
      },
      {
        label: "Height",
        value: props.height,
      },
      {
        label: "Weight",
        value: props.weight,
      },
      {
        label: "Abilities",
        value: props.abilities.map((item) => item.ability.name).join(", "),
      },
    ];
  }, [props.abilities, props.height, props.species.name, props.weight]);

  const handleSubmit = ({
    success,
    event,
  }: {
    success: boolean;
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>;
  }) => {
    event.preventDefault();
    if (success) {
      const findSamePokemon = statePokemon?.find(
        (item) => item.username === username
      );
      if (findSamePokemon) {
        return setErrorMsg("Username already taken, please use another.");
      }

      const payload = {
        id: props.id,
        name: props.name,
        dreamworld: props.sprites.front_default,
        username,
      };

      dispatchPokemon({
        type: PokemonEnumActionType.ADD_POKEMON,
        payload,
      });
      setModal({
        open: false,
        success: true,
      });
    } else {
      setModal({
        open: false,
        success: false,
      });
    }
  };

  const handleAddPokemon = async () => {
    const probabilitySuccess = probabilityAddPokemon();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (probabilitySuccess) {
        setModal({
          open: true,
          success: true,
        });
      } else {
        setModal({
          open: true,
          success: false,
        });
      }
    }, 500);
  };

  return (
    <ContainerContent>
      <Loading isLoading={isLoading} />
      <Modal isOpen={modal.open}>
        {modal.success ? (
          <>
            <div
              style={{
                fontSize: "1.2em",
                margin: "0 0 10px 0",
                fontWeight: "bold",
                borderBottom: "1px solid black",
                textAlign: "center",
                paddingBottom: 10,
              }}
            >
              Congrats you got it
            </div>
            <form>
              <label htmlFor="username">Input username</label>
              <input
                placeholder="ex: rivari22"
                type="text"
                id="username"
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: "100%",
                  marginTop: 10,
                  border: "1px solid black",
                  borderRadius: 6,
                  height: "2rem",
                  padding: 10
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 10,
                }}
              >
                <ButtonStyled
                  onClick={(event) => handleSubmit({ success: true, event })}
                  className="hoverPointer"
                >
                  Submit
                </ButtonStyled>
                <ButtonStyled
                  onClick={(e) => {
                    e.preventDefault();
                    setModal({ open: false, success: false });
                  }}
                  className="hoverPointer"
                >
                  Cancel
                </ButtonStyled>
              </div>
              <div style={{ color: "red", fontWeight: 600 }}>{errorMsg}</div>
            </form>
          </>
        ) : (
          <>
            <div>Sorry you failed to get pokemon.</div>
            <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
              <ButtonStyled
                onClick={(event) => {
                  handleSubmit({ success: false, event });
                }}
              >
                close
              </ButtonStyled>
            </div>
          </>
        )}
      </Modal>
      <Tab tabActive={tabActive} setTabActive={setTabActive} />
      {tabActive === "about" ? (
        <div>
          <AboutDetail data={dataAboutTab} />
        </div>
      ) : (
        <div>
          <BaseStatsDetail data={props.stats} />
        </div>
      )}
      <button onClick={handleAddPokemon}>add pokemon</button>
    </ContainerContent>
  );
};

export default ContentDetail;
