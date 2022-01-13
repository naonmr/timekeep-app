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
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

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
      agendas: [{ agenda: "", time: 1 }],
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
      <Center>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "500px" }}>
          <FormControl isRequired>
            <FormLabel>
              {/* input部分 */}
              <Input
                variant="filled"
                {...register("meetingTitle")}
                placeholder="Meeting title"
              />
            </FormLabel>
          </FormControl>
          <Flex>
            <p>Agenda</p>
            <Spacer />
            <p>time</p>
          </Flex>

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
                          {...register(`agendas.${index}.agenda` as const, {
                            required: true,
                          })}
                          className={
                            errors?.agendas?.[index]?.agenda ? "error" : ""
                          }
                          defaultValue={field.agenda}
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

                    <CloseIcon type="button" onClick={() => remove(index)} />
                  </Flex>
                </section>
              </div>
            );
          })}

          <Center>
            <Stack spacing={2} direction="row" align="center">
              <Button
                colorScheme="teal"
                variant="outline"
                type="button"
                onClick={() => {
                  append({ agenda: "", time: 0 });
                }}
              >
                add
              </Button>
              <Button
                colorScheme="teal"
                variant="outline"
                type="button"
                onClick={() => insert(focusIndex, { agenda: "", time: 0 })}
              >
                insert
              </Button>
              <Button
                colorScheme="teal"
                variant="outline"
                type="button"
                onClick={() => move(focusIndex, focusIndex + 1)}
              >
                move
              </Button>
            </Stack>
          </Center>
          <Button colorScheme="teal" variant="solid" type="submit" m={2}>
            そうしん！
          </Button>
        </form>
      </Center>
    </>
  );
};

export default InputComponent;
