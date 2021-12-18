import React from 'react'
import { Modal } from '../Modal'
import ReactLoading from "react-loading";


interface ILoadingProps {
    isLoading: boolean
}

const Loading = ({ isLoading }: ILoadingProps) => {
    return (
        <Modal isOpen={isLoading} loading>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ReactLoading
            type={"balls"}
            color={"red"}
            height={"30%"}
            width={"30%"}
          />
        </div>
      </Modal>
    )
}

export default Loading
