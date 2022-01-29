import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

import { PrimaryButton, SubButton } from "./Button";

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
} from "@chakra-ui/react";
import { CloseIcon, InfoOutlineIcon } from "@chakra-ui/icons";

type InputAgendaProps = {
  defaultAgenda: { title: String; time: Number }[];
  defaultMtgTitle: String;
  onSubmit: any;
};

const InputAgenda = (props: InputAgendaProps) => {
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
      <Box>
        <Box boxSizing="border-box" p="2">
          <Center>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={errors.title}>
                <FormLabel pl="1">Meeting Title</FormLabel>
                <Input
                  variant="filled"
                  size="sm"
                  {...register("title")}
                  placeholder="Meeting title"
                />
              </FormControl>

              {fields.map((field: any, index) => {
                // 一個目のInputBarのみラベルをつける
                if (index === 0) {
                  return (
                    <div key={field.id}>
                      <Box>
                        <section className={"section"} key={field.id}>
                          <HStack spacing="2%" mt="5">
                            <FormControl isInvalid={errors.title}>
                              <FormLabel pl="1">agenda</FormLabel>
                              <Input
                                variant="filled"
                                size="sm"
                                placeholder="agenda title"
                                {...register(
                                  `agendas.${index}.title` as const,
                                  {
                                    required: true,
                                  }
                                )}
                                defaultValue={field.title}
                                errorBorderColor="red.300"
                                onFocus={() => setFocusIndex(index)}
                              />
                            </FormControl>

                            <FormControl isInvalid={errors.time}>
                              <FormLabel pl="1">time(min)</FormLabel>
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
                                defaultValue={field.time}
                                errorBorderColor="red.300"
                                onFocus={() => setFocusIndex(index)}
                              />
                            </FormControl>

                            <VStack>
                              <Text></Text>

                              {/* TODO 2個目以降のInputバーと高さを揃えるより良い方法を考える */}
                              <Spacer></Spacer>
                              <Spacer></Spacer>
                              <Spacer></Spacer>

                              <CloseIcon
                                type="button"
                                onClick={() => remove(index)}
                              />
                            </VStack>
                          </HStack>
                        </section>
                      </Box>
                    </div>
                  );
                }

                // ここから2個目以降のInputバー
                return (
                  <div key={field.id}>
                    <Box display="flex" alignItems={"center"}>
                      <section className={"section"} key={field.id}>
                        <HStack spacing="2%">
                          <FormControl isInvalid={errors.title}>
                            <FormLabel></FormLabel>
                            <Input
                              variant="filled"
                              size="sm"
                              placeholder="agenda title"
                              {...register(`agendas.${index}.title` as const, {
                                required: true,
                              })}
                              defaultValue={field.title}
                              onFocus={() => setFocusIndex(index)}
                            />
                          </FormControl>

                          <FormControl isInvalid={errors.time}>
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
                              defaultValue={field.time}
                              onFocus={() => setFocusIndex(index)}
                            />
                          </FormControl>
                          <VStack>
                            <Spacer></Spacer>

                            <CloseIcon
                              type="button"
                              onClick={() => remove(index)}
                            />
                          </VStack>
                        </HStack>
                      </section>
                    </Box>
                  </div>
                );
              })}

              <Center>
                <HStack spacing={2} mt="3.5" mr="6">
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
              <PrimaryButton text="save" type="submit" mt={3} mr="6" />
            </form>
          </Center>
        </Box>
      </Box>
    </>
  );
};

export default InputAgenda;
