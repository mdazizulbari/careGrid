import React, { useState } from "react";
import UpdateCampModal from "../../Modal/UpdateCampModal";
import DeleteCampModal from "../../Modal/DeleteCampModal";

const CampsDataRow = ({ camp, refetch }) => {
  const { name, dateTime, location, healthcareProfessional } = camp;
  const [isOpen, setIsOpen] = useState(false);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);

  const close = () => {
    setIsOpen(false);
  };
  const deleteClose = () => {
    setDeleteIsOpen(false);
  };

  return (
    <tr className="hover:bg-base-200">
      <td className="text-primary">{name}</td>
      <td>{healthcareProfessional}</td>
      <td>{dateTime}</td>
      <td>{location}</td>
      <td>
        <button
          onClick={() => setIsOpen(true)}
          className="btn btn-sm btn-primary btn-soft"
        >
          Update
        </button>
        <UpdateCampModal
          isOpen={isOpen}
          camp={camp}
          close={close}
          refetch={refetch}
        />
      </td>
      <td>
        <button
          onClick={() => setDeleteIsOpen(true)}
          className="btn btn-sm btn-error btn-soft"
        >
          Delete
        </button>
        <DeleteCampModal
          deleteIsOpen={deleteIsOpen}
          camp={camp}
          deleteClose={deleteClose}
          refetch={refetch}
        />
      </td>
    </tr>
  );
};

export default CampsDataRow;
