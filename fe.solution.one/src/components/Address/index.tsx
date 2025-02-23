import React, { useState } from "react";
import classnames from "classnames";

import { IAddress } from "src/interfaces/Address";

import classes from "./index.module.css";

export interface IAddressComponent {
  address: IAddress;
  isEdited: boolean;
  onEdit: (id: string | null) => void;
  onUpdate: (updatedAddress: any) => void;
  onDelete: (id: string) => void;
}

export const Address = ({
  address,
  isEdited,
  onEdit,
  onUpdate,
  onDelete,
}: IAddressComponent) => {
  const [cloneAddres, setCloneAddress] = useState({ ...address });

  const handleControlsClick = (evt: React.MouseEvent<HTMLDivElement>) => {
    const target = evt.target as HTMLElement;
    const btnType = target.dataset.et;

    switch (btnType) {
      case "edit":
        onEdit(address.id);
        break;
      case "delete":
        onDelete(address.id);
        break;
      case "cancel":
        setCloneAddress(address);

        onEdit(null);
        break;
      case "save":
        onUpdate(cloneAddres);
        break;
      default:
    }
  };

  const handleValueChange = (key: string, value: string) => {
    setCloneAddress(Object.assign({ ...cloneAddres, [key]: value }));
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper} onClick={handleControlsClick}>
        {/* Static view */}
        <div
          className={classnames(classes.static, {
            [classes.visible]: !isEdited,
          })}
        >
          <div className={classes.text}>
            <span>{address.address},</span>
            <span>&nbsp;{address.country},</span>
            <span>&nbsp;{address.zip}</span>
          </div>
          <div className={classes.controls}>
            <div className={classes.btn} data-et="edit">
              Edit
            </div>
            <div className={classes.btn} data-et="delete">
              Delete
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div
          className={classnames(classes.form, {
            [classes.visible]: isEdited,
          })}
        >
          {Object.keys(cloneAddres)
            .filter((key) => key !== "id")
            .map((key) => (
              <div key={key} className={classes.prop}>
                <label htmlFor={key}>{key}:</label>
                <input
                  type="text"
                  value={cloneAddres[key]}
                  onChange={(evt) => handleValueChange(key, evt.target.value)}
                />
              </div>
            ))}
          <div className={classes.btn} data-et="cancel">
            Cancel
          </div>
          <div className={classes.btn} data-et="save">
            Save
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;
