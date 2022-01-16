import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import React, { useState } from "react";
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
import { useHistory } from "react-router-dom";

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
  const history = useHistory();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Contents>({
    defaultValues: {
      title: defaultMtgTitle,
      agendas: defaultAgenda,
    },
    mode: "onBlur",
  });

  const { fields, append, remove, insert, move } = useFieldArray({
    name: "agendas",
    control,
  });

  return (
    <>
      <Center>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ width: "500px", marginTop: "20px" }}
        >
          <FormControl isRequired>
            <FormLabel>
              {/* input部分 */}
              <Input
                variant="filled"
                {...register("title")}
                placeholder="Meeting title"
              />
            </FormLabel>
          </FormControl>

          {fields.map((field, index) => {
            return (
              <div key={field.id}>
                <section className={"section"} key={field.id}>
                  <Flex>
                    <FormControl isRequired>
                      <FormLabel>
                        <Input
                          variant="outline"
                          placeholder="agenda title"
                          {...register(`agendas.${index}.title` as const, {
                            required: true,
                          })}
                          className={
                            errors?.agendas?.[index]?.title ? "error" : ""
                          }
                          defaultValue={field.title}
                          errorBorderColor="red.300"
                          onFocus={() => setFocusIndex(index)}
                        />
                      </FormLabel>
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>
                        <Input
                          variant="outline"
                          placeholder="time"
                          type="number"
                          {...register(`agendas.${index}.time` as const, {
                            valueAsNumber: true,
                            required: true,
                          })}
                          className={
                            errors?.agendas?.[index]?.time ? "error" : ""
                          }
                          defaultValue={field.time}
                          errorBorderColor="red.300"
                          onFocus={() => setFocusIndex(index)}
                        />
                      </FormLabel>
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

          <PrimaryButton text="save" type="submit" mt={2} />
        </form>
      </Center>
    </>
  );
};

export default InputAgenda;
