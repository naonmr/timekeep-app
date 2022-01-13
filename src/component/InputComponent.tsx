import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import React, { useState } from "react";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react";

type Contents = {
  meetingTitle: string;
  agendas: {
    agenda: string;
    time: number;
  }[];
};

const InputComponent: React.VFC = () => {
  const [focusIndex, setFocusIndex] = useState(0);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Contents>({
    defaultValues: {
      agendas: [{ agenda: "please", time: 1 }],
    },
    mode: "onBlur",
  });

  const { fields, append, remove, insert, move } = useFieldArray({
    name: "agendas",
    control,
  });

  const onSubmit = (data: Contents) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("meetingTitle")} placeholder="Meeting title" />

        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <section className={"section"} key={field.id}>
                <input
                  placeholder="name"
                  {...register(`agendas.${index}.agenda` as const, {
                    required: true,
                  })}
                  className={errors?.agendas?.[index]?.agenda ? "error" : ""}
                  defaultValue={field.agenda}
                  onFocus={() => setFocusIndex(index)}
                />
                <input
                  placeholder="time"
                  type="number"
                  {...register(`agendas.${index}.time` as const, {
                    valueAsNumber: true,
                    required: true,
                  })}
                  className={errors?.agendas?.[index]?.time ? "error" : ""}
                  defaultValue={field.time}
                  onFocus={() => setFocusIndex(index)}
                />
                <button type="button" onClick={() => remove(index)}>
                  Delete
                </button>
              </section>
            </div>
          );
        })}
        <button
          type="button"
          onClick={() => {
            append({ agenda: "", time: 0 });
          }}
        >
          add
        </button>
        <button
          type="button"
          onClick={() => insert(focusIndex, { agenda: "", time: 0 })}
        >
          insert
        </button>
        <button type="button" onClick={() => move(focusIndex, focusIndex + 1)}>
          move
        </button>
        <input type="submit" />
      </form>
    </>
  );
};

export default InputComponent;
