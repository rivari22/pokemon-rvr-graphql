import styled from "@emotion/styled";
import ProgressBar from "@ramonak/react-progress-bar";
import React, { useContext, useMemo, useState } from "react";
import { PokemonContext } from "../context/AppPokemonContext/context";
import { PokemonEnumActionType } from "../context/AppPokemonContext/reducer";
import { IDetailPokemon } from "../interface/DetailInterface";
import { probabilityAddPokemon } from "../utils/probabilityAddPokemon";
import AboutDetail from "./AboutDetail";
import BaseStatsDetail from "./BaseStatsDetail";
import { Loading } from "./Loading";
import { Modal } from "./Modal";
import { DetailTab } from "./Tab";

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

export const ContainerDetailContent = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
`;

export const ContentDetailList = ({
  label,
  value,
  width,
  bgColorBar,
}: {
  label: string;
  value: string;
  width?: number;
  bgColorBar?: string;
}) => (
  <div
    style={{ display: "flex", marginBottom: 10, gap: 20, alignItems: "center" }}
  >
    <div style={{ display: "flex", gap: 60, alignItems: "center" }}>
      <div style={{ minWidth: 60, width, textTransform: 'capitalize' }}>{label}</div>
      <div style={{ width: width ? 30 : "auto" }}>{value}</div>
    </div>
    {bgColorBar && (
      <ProgressBar
        completed={value}
        width="120px"
        height="6px"
        bgColor={bgColorBar}
        customLabel=" "
      />
    )}
  </div>
);

const ContentDetail = (props: IDetailPokemon) => {
  const { state: statePokemon, dispatch: dispatchPokemon } =
    useContext(PokemonContext);
  const [tabActive, setTabActive] = useState<"about" | "baseStats">("about");
  const [modal, setModal] = useState({
    open: false,
    success: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const dataAboutTab = useMemo(() => {
    return [
      {
        label: "Species",
        value: props.species.name,
      },
      {
        label: "Height",
        value: String(props.height),
      },
      {
        label: "Weight",
        value: String(props.weight),
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
        (item) => item.nickname === nickname
      );
      if (findSamePokemon) {
        return setErrorMsg("Nickname already taken, please use another.");
      } else if (!nickname) {
        return setErrorMsg("Nickname cannot empty.");
      }

      const payload = {
        id: props.id,
        name: props.name,
        dreamworld: props.sprites.front_default,
        nickname,
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
              <label htmlFor="nickname">Input nickname</label>
              <input
                placeholder="ex: rivari22"
                type="text"
                id="nickname"
                onChange={(e) => setNickname(e.target.value)}
                style={{
                  width: "100%",
                  marginTop: 10,
                  border: "1px solid black",
                  borderRadius: 6,
                  height: "2rem",
                  padding: 10,
                }}
                minLength={1}
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
            <div>Sorry you failed to get pokemon. You can try again.</div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
      <DetailTab tabActive={tabActive} setTabActive={setTabActive} />
      {tabActive === "about" ? (
        <div>
          <AboutDetail data={dataAboutTab} />
        </div>
      ) : (
        <div>
          <BaseStatsDetail data={props.stats} />
        </div>
      )}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: " translate(-50%, -0%)",
        }}
      >
        <button onClick={handleAddPokemon} style={{ borderRadius: 6, backgroundColor: 'white', padding: '6px 20px' }}>
          Catch pokemon
        </button>
      </div>
    </ContainerContent>
  );
};

export default ContentDetail;
