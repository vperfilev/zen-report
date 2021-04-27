import React, { FC } from "react";

interface Props {
    colour: string
}

export const AccountIcon: FC<Props> = ({colour}) => {
    return <div className="w-1 mx-1" style={{ backgroundColor: colour }}></div>
}