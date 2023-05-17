import {
  Box,
  Center,
  Flex,
  Heading,
  Text,
  Button,
  Input,
  Select,
  FormLabel,
  Divider,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Tag, X } from "react-feather";
import dbConnect from "@/Middleware/connectDb";
import Zone from "@/models/Zone";

export default function editzone({ Zone }) {
  const Router = useRouter();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      weight: [Zone.weights.map((item) => item)],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "weight",
  });

  const [tags, setTags] = useState(Zone.country);

  useEffect(() => {
    if (Zone) {
      setValue("zone", Zone.zone);

      setValue(
        "weight",
        Zone.weights.map((item, INDEX) => item)
      );
    }
  }, [Zone, setValue]);

  const onSubmit = async (data) => {
    console.log(data);
    console.log(tags);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/editZone`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: Zone._id,
          options: data.weight,
          zone: data.zone,
          country: tags,
        }),
      }
    );
    const data2 = await response.json();
    if (data2.success == true) {
      toast({
        title: "Zone Edit.",
        description: "Zone have been Updated ",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      Router.push("/admin");
    } else {
      toast({
        title: "error",
        description: "Duplicate Zone Try Agaibn",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  //   console.log(";zone", Zone);

  return (
    <>
      <Box
        width={"100%"}
        //    height="100vh"
        bg={"gray.200"}
      >
        <Box bg={"#153A5B"} p="0.4rem">
          <Center>
            <Heading color={"white"}>Edit Zone</Heading>
          </Center>
        </Box>

        <Flex
          // align={"center"}
          direction="column"
          border={"1px"}
          borderColor="gray.200"
          width="80%"
          marginInline={"auto"}
          bg="white"
          borderRadius={"8px"}
          justify="center"
          //   height={"100vh"}
        >
          <Box ml="1rem">
            <Text color={"#153A5B"} fontWeight="semibold">
              Zone Info
            </Text>
          </Box>
          <Divider />
          <Box my={"1rem"}>
            <form>
              <Flex direction={"column"} p="1rem">
                <Box w={"50%"}>
                  <FormLabel>Add Zone Level</FormLabel>
                  <Select
                    {...register("zone", { required: true })}
                    border="1px"
                    borderColor="#153A5B"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </Select>
                </Box>
                <Box>
                  <Tag className="InputIcon" size="16" />
                  <Input
                    border="1px"
                    borderColor="#153A5B"
                    type="text"
                    className="TagForm"
                    placeholder="Add a Country..."
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        setTags([...tags, event.target.value]);
                        event.target.value = "";
                      }
                    }}
                    autoFocus
                  />
                  <ul className="TagList">
                    {tags.map((tag) => (
                      <li key={tag} className="Tag">
                        {tag}
                        <X
                          className="TagIcon"
                          size="16"
                          onClick={() => {
                            setTags([...tags.filter((word) => word !== tag)]);
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                </Box>
                <Box my={"1rem"}>
                  <Flex
                    direction={"row"}
                    // border="1px "
                    wrap={"wrap"}
                    justify="space-evenly"
                  >
                    <Box w={"100%"}>
                      <FormLabel ml={"2rem"}>Add Weigth / Price</FormLabel>
                      {fields.map((item, index) => {
                        return (
                          <Flex
                            justify={"space-evenly"}
                            my={"0.5rem"}
                            key={item.id}
                            // border="1px"
                            w={"100%"}
                          >
                            <Input
                              border="1px"
                              borderColor="#153A5B"
                              type={"number"}
                              placeholder="Weight"
                              w={"30%"}
                              step={0.01}
                              {...register(`weight.${index}.weight`, {
                                required: true,
                              })}
                            />

                            <Input
                              border="1px"
                              borderColor="#153A5B"
                              placeholder="Price"
                              type={"number"}
                              step={0.01}
                              w={"30%"}
                              {...register(`weight.${index}.price`, {
                                required: true,
                              })}
                            />

                            <Button
                              colorScheme={"red"}
                              type="button"
                              px={"1rem"}
                              onClick={() => remove(index)}
                            >
                              Delete
                            </Button>
                          </Flex>
                        );
                      })}
                      <Flex justify={"end"} mr="2.5rem" mt={"1rem"}>
                        <Button
                          colorScheme={"green"}
                          type="button"
                          onClick={() => {
                            append({
                              weight: [
                                {
                                  weight: "",
                                  price: "",
                                },
                              ],
                            });
                          }}
                          mr="1rem"
                        >
                          add
                        </Button>

                        <Button
                          colorScheme={"blue"}
                          type="button"
                          onClick={() =>
                            reset({
                              weight: [
                                {
                                  weight: "",
                                  price: "",
                                },
                              ],
                            })
                          }
                        >
                          Reset
                        </Button>
                      </Flex>
                    </Box>
                    <Divider my={"1rem"} />
                  </Flex>
                </Box>
                {/* <Box my={"1rem"}></Box> */}
                <Button
                  variant={"outline"}
                  colorScheme="purple"
                  onClick={handleSubmit(onSubmit)}
                >
                  Submit
                </Button>
              </Flex>
            </form>
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export async function getServerSideProps(context) {
  await dbConnect();

  console.log(context.query.id);
  let id = context.query.id;
  console.log(id);

  const res = await Zone.findOne({ _id: id });
  if (res == null) {
    return {
      redirect: {
        permanent: false,
        destination: "/admin/allzones",
      },
    };
  }
  const posts = await JSON.parse(JSON.stringify(res));
  // console.log(posts);

  return {
    props: { Zone: posts }, // will be passed to the page component as props
  };
}
