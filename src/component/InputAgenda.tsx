import { useForm, useFieldArray } from "react-hook-form";
import React, { useEffect, useState } from "react";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Stack,
  Center,
  Flex,
  Spacer,
  HStack,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { PrimaryButton, SubButton } from "./Button";

type Contents = {
  title: string;
  agendas: {
    title: string;
    time: number;
  }[];
};

const InputAgenda: React.VFC<any> = (props) => {
  const [focusIndex, setFocusIndex] = useState(0);
  const { defaultAgenda, defaultMtgTitle, onSubmit } = props;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onBlur",
  });

  const { fields, append, remove, insert, move } = useFieldArray({
    name: "agendas",
    control,
  });

  useEffect(() => {
    setValue("title", defaultMtgTitle);
    setValue("agendas", defaultAgenda);
  }, [defaultMtgTitle, defaultAgenda]);

  return (
    <>
      <Center>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ width: "500px", marginTop: "20px" }}
        >
          <FormControl isInvalid={errors.title}>
            <FormLabel>Meeting Title</FormLabel>
            {/* input部分 */}
            <Input
              variant="filled"
              {...register("title")}
              placeholder="Meeting title"
            />
          </FormControl>

          {/* TODO 横並びにする */}
          <div className="agenda-title">agenda title</div>
          <div className="agenda-title">time</div>

          {fields.map((field: any, index) => {
            return (
              <div key={field.id}>
                <section className={"section"} key={field.id}>
                  <Flex>
                    <FormControl isInvalid={errors.title}>
                      <FormLabel></FormLabel>
                      <Input
                        variant="outline"
                        placeholder="agenda title"
                        {...register(`agendas.${index}.title` as const, {
                          required: true,
                        })}
                        // className={
                        //   errors?.agendas?.[index]?.title ? "error" : ""
                        // }
                        defaultValue={field.title}
                        errorBorderColor="red.300"
                        onFocus={() => setFocusIndex(index)}
                      />
                    </FormControl>

                    <FormControl isInvalid={errors.time}>
                      <FormLabel> </FormLabel>
                      <Input
                        variant="outline"
                        placeholder="time"
                        type="number"
                        {...register(`agendas.${index}.time` as const, {
                          valueAsNumber: true,
                          required: true,
                          min: {
                            value: 1,
                            message: "1以上の数字を入力してください",
                          },
                        })}
                        // className={
                        //   errors?.agendas?.[index]?.time ? "error" : ""
                        // }
                        defaultValue={field.time}
                        errorBorderColor="red.300"
                        onFocus={() => setFocusIndex(index)}
                      />
                    </FormControl>

                    <CloseIcon
                      type="button"
                      onClick={() => remove(index)}
                      mt={2.5}
                    />
                  </Flex>
                </section>
              </div>
            );
          })}
          <Center>
            <Stack spacing={2} direction="row" align="center">
              <SubButton
                text="add"
                type="button"
                onclick={() => {
                  append({ title: "", time: 0 });
                }}
              />
              <SubButton
                text="insert"
                type="button"
                onclick={() => insert(focusIndex, { title: "", time: 0 })}
              />
              <SubButton
                text="move"
                type="button"
                onclick={() => move(focusIndex, focusIndex + 1)}
              />
            </Stack>
          </Center>
          <div>※全てのフォームを記入してください</div>
          <div>※timeには1以上の数字を、半角で入力してください</div>
          <PrimaryButton text="save" type="submit" mt={2} />
        </form>
      </Center>
    </>
  );
};

export default InputAgenda;
