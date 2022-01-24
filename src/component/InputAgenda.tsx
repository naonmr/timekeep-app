import { useForm, useFieldArray } from "react-hook-form";
import React, { useEffect, useState } from "react";
import {
  FormLabel,
  FormControl,
  Input,
  Center,
  Spacer,
  HStack,
  Box,
  Text,
  VStack,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import { CloseIcon, InfoOutlineIcon } from "@chakra-ui/icons";
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
      <Box m="4">
        <VStack>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.title}>
              <FormLabel>Meeting Title</FormLabel>
              {/* input部分 */}
              <Input
                variant="filled"
                size="sm"
                {...register("title")}
                placeholder="Meeting title"
              />
            </FormControl>

            {fields.map((field: any, index) => {
              // 一個目だけラベルをつける
              if (index === 0) {
                return (
                  <div key={field.id}>
                    <section className={"section"} key={field.id}>
                      <HStack spacing="12px" mt="5">
                        <FormControl isInvalid={errors.title} w="350px">
                          <FormLabel>agenda</FormLabel>
                          <Input
                            variant="filled"
                            size="sm"
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

                        <FormControl isInvalid={errors.time} w="70px">
                          <FormLabel>time</FormLabel>
                          <Input
                            variant="filled"
                            size="sm"
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

                        <VStack>
                          <Text></Text>
                          <Spacer></Spacer>
                          <Spacer></Spacer>
                          <CloseIcon
                            type="button"
                            onClick={() => remove(index)}
                          />
                        </VStack>
                      </HStack>
                    </section>
                  </div>
                );
              }
              return (
                <div key={field.id}>
                  <section className={"section"} key={field.id}>
                    <HStack spacing="12px">
                      <FormControl isInvalid={errors.title} w="350px">
                        <FormLabel></FormLabel>
                        <Input
                          variant="filled"
                          size="sm"
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

                      <FormControl isInvalid={errors.time} w="70px">
                        <FormLabel> </FormLabel>
                        <Input
                          variant="filled"
                          size="sm"
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
                    </HStack>
                  </section>
                </div>
              );
            })}

            <Center>
              <HStack spacing={2} mt="3.5">
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
              </HStack>
            </Center>

            <List spacing={1} mt="1.5">
              <ListItem fontSize="xs">
                <ListIcon as={InfoOutlineIcon} color="green.500" />
                全てのフォームを記入してください
              </ListItem>
              <ListItem fontSize="xs">
                <ListIcon as={InfoOutlineIcon} color="green.500" />
                timeには1以上の数字を、半角で入力してください{" "}
              </ListItem>
            </List>
            <PrimaryButton text="save" type="submit" mt={2} />
          </form>
        </VStack>
      </Box>
    </>
  );
};

export default InputAgenda;
