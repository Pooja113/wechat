import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom';

import { Button, FormControl, FormLabel, Input, InputGroup, InputRightAddon, InputRightElement, VStack } from '@chakra-ui/react'

const BASE_URL="http://localhost:3001"

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState()
  const [email,setEmail] = useState()
  const [password,setPassword] = useState()
  const [confirmPassword,setConfirmPassword] = useState()
  const [pic, setPic] = useState()
  const [showPass, setShowPass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const postDetails = (pics) => {
    console.log(pics)
    setLoading(true)
    if(pics === undefined) {
      console.log("Please select image")
      return;
    }
    if(pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics)
      data.append("upload_preset", "wechat")
      data.append("cloud_name", "dcvgvvipn")
      fetch("https://api.cloudinary.com/v1_1/dcvgvvipn/image/upload", {
        method: "post",
        body:data
      }).then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setLoading(false)
        }).catch((err) => {
          console.log(err)
          setLoading(false)
      })

    } else {
      console.log("select Jpeg or png")
      setLoading(false)
      return
    }
  }
  const submitHandler = async () => {
    setLoading(true)
    if(password !== confirmPassword) {
      console.log("Check Passwords")
    }

    try {
      const config = {
        headers: {
          "Content-type":"application/json"
        }
      }

      const data = await axios.post(`${BASE_URL}/user/register`,
        { name, email, password, pic },
        config
      )
      localStorage.setItem("userToken", JSON.stringify(data))
      navigate('/chats');
      setLoading(false)
    } catch (error) { 
      console.log(error.message)
      setLoading(false)
    }
  }


  return (
    <VStack spacing="5px">
      <FormControl id='name' isRequired>
        <FormLabel>
          Name
        </FormLabel>
        <Input
          placeholder='Enter Name'
          onChange={(e)=>setName(e.target.value)}
        />
      </FormControl>
      <FormControl id='email' isRequired>
        <FormLabel>
          Email
        </FormLabel>
        <Input
          placeholder='Enter Email'
          onChange={(e)=>setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id='password' isRequired>
        <FormLabel>
          Password
        </FormLabel>
        <InputGroup>
          <Input
          type={showPass ? "text" : "password"}
          placeholder='Enter Password'
          onChange={(e)=>setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={()=>setShowPass(!showPass)}> {showPass ? "Hide" : "Show"} </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id='confirm-password' isRequired>
        <FormLabel>
          Confirm Password
        </FormLabel>
        
        <InputGroup>
          <Input
          type={showConfirmPass ? "text" : "password"}
          placeholder='Confirm Password'
          onChange={(e)=>setConfirmPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={()=>setShowConfirmPass(!showConfirmPass)}> {showConfirmPass ? "Hide" : "Show"} </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id='pic' isRequired>
        <FormLabel>
            Upload Picture
          </FormLabel>
        <Input
          type='file'
          p={1.5}
          accept='image/*'
          onChange={(e)=>postDetails(e.target.files[0])}
          />
      </FormControl>
      <Button colorScheme='green' width="100%" style={{marginTop:15}} onClick={submitHandler} isLoading={loading}> Sign Up</Button>
    </VStack>
  )
}

export default SignUp
