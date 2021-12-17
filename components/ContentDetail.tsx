import styled from "@emotion/styled";
import React, { useContext, useMemo, useState } from "react";
import { PokemonContext } from "../context/AppPokemonContext/context";
import { PokemonEnumActionType } from "../context/AppPokemonContext/reducer";
import { IDetailPokemon } from "../pages/detail/[name]";
import { probabilityAddPokemon } from "../utils/probabilityAddPokemon";
import AboutDetail from "./AboutDetail";
import BaseStatsDetail from "./BaseStatsDetail";
import Modal from "react-modal";

Modal.setAppElement('#__next');

const ContainerContent = styled.section`
  min-width: 400px;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  background-color: #ffffff;
  min-height: 50vh;
  max-height: 100vh;
  padding: 60px 20px;
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
  const { dispatch: dispatchPokemon } = useContext(PokemonContext);
  const [tabActive, setTabActive] = useState<"about" | "baseStats">("about");
  const [isOpenModal, setIsOpenModal] = useState({
    open: false,
    success: false,
  });
  const [username, setUsername] = useState<string>('');
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

  const handleSubmit = ({success} : {success: boolean}) => {
    if (success) {
      const payload = {
        id: props.id,
        name: props.name,
        dreamworld: props.sprites.front_default,
        username
      };
  
      dispatchPokemon({
        type: PokemonEnumActionType.ADD_POKEMON,
        payload,
      });
      setIsOpenModal({
        open: false,
        success: true,
      })
    } else {
      setIsOpenModal({
        open: false,
        success: false,
      })
    }
  }

  const handleAddPokemon = async () => {
    const probabilitySuccess = probabilityAddPokemon();

    if (probabilitySuccess) {
      setIsOpenModal({
        open: true,
        success: true,
      });
    } else {
      // TODO ADD MODAL
      console.log("GAGAL NIH");
      setIsOpenModal({
        open: true,
        success: false,
      });
    }
  };

  return (
    <ContainerContent>
      <Modal isOpen={isOpenModal.open} contentLabel="Example Modal">
        {isOpenModal.success ? (
          <form >
            <label htmlFor="username">Input username</label>
            <input type="text" id="username" onChange={(e) => setUsername(e.target.value)} />
            <button onClick={() => handleSubmit({success: true})}>Congrats</button>
          </form>
        ) : (
          <button onClick={() => handleSubmit({success: false})}>gagal nih</button>
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
