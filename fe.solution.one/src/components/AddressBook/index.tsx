import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

import API from "src/api/index.js";
import { IAddress } from "src/interfaces/Address";
import Address from "src/components/Address";

import classes from "./index.module.css";

export const AddressBook = () => {
  const params = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [addresses, setAddressess] = useState<IAddress[]>([]);

  const handleEdit = (id: number) => {
    if (id) navigate(`/address/${id}/edit`);
    else navigate("/");
  };

  const handleDelete = (id: number) => {
    API.address.delete(id).then(() => {
      const newList = structuredClone(
        addresses.filter((address) => address.id !== id)
      );

      setAddressess(newList);
    });
  };

  const handleUpdate = (updatedAddress: IAddress) => {
    API.address.update(updatedAddress).then(() => {
      const newList = structuredClone(addresses);
      const replaceIndex = newList.findIndex(
        (address) => address.id === updatedAddress.id
      );

      newList[replaceIndex] = updatedAddress;

      setAddressess(newList);

      navigate("/");
    });
  };

  // can be replaced with React Query or RTK
  useEffect(() => {
    let ignore = false;

    API.address.get().then((list: IAddress[]) => {
      if (!ignore) setAddressess(list);
    });

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Address book</h2>

        <div className={classes.list}>
          {addresses.map((address) => (
            <Address
              key={address.address + address.zip}
              address={address}
              isEdited={params.id ? +params.id === address.id : false}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddressBook;
