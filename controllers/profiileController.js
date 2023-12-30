import JWT from "jsonwebtoken";
import { jwtDecode } from "../helpers/authHelper.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProfileNameEmailController = async (req, res) => {
  try {
    // console.log("This called again.");
    const { token } = req.params;
    const decodedToken = await jwtDecode(token);
    const data = decodedToken.value;
    // console.log(data.id);
    const userId = parseInt(data.id);

    // console.log(userId);

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    // console.log(user);
    return res.status(200).send({
      success: true,
      message: "got data successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error,
    });
  }
};

export const getProfileInfoController = async (req, res) => {
  try {
    const { token } = req.params;
    const decodedToken = await jwtDecode(token);
    const data = decodedToken.value;
    // console.log(data.id);
    const userId = parseInt(data.id);

    const user_metadata = await prisma.user_metadata.findUnique({
      where: {
        userId: userId,
      },
    });
    // console.log(user_metadata);
    return res.status(200).send({
      success: true,
      message: "got data successfully",
      data: user_metadata,
    });
  } catch {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error,
    });
  }
};

export const updateNameEmailController = async (req, res) => {
  try {
    const { token } = req.params;
    const decodedToken = await jwtDecode(token);
    const data = decodedToken.value;
    // console.log(data.id);
    const userId = parseInt(data.id);

    const { name, email } = req.body;
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
      },
    });
    return res.status(200).send({
      success: true,
      message: "got data successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error,
    });
  }
};

export const updateAgeRangeController = async (req, res) => {
  try {
    const { token } = req.params;
    const decodedToken = await jwtDecode(token);
    const data = decodedToken.value;
    // console.log(data.id);
    const userId = parseInt(data.id);
    const { ageRange } = req.body;
    const age = await prisma.user_metadata.update({
      where: {
        userId: userId,
      },
      data: {
        ageRange,
      },
    });
    return res.status(200).send({
      success: true,
      message: "got data successfully",
      data: age,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error,
    });
  }
};

export const updateGenderController = async (req, res) => {
    try {
        const { token } = req.params;
        const decodedToken = await jwtDecode(token);
        const data = decodedToken.value;
        // console.log(data.id);
        const userId = parseInt(data.id);
        const { gender } = req.body;
        const user_gender = await prisma.user_metadata.update({
          where: {
            userId: userId,
          },
          data: {
            gender,
          },
        });
        return res.status(200).send({
          success: true,
          message: "got data successfully",
          data: user_gender,
        });
      } catch (error) {
        console.log(error);
        return res.status(500).send({
          success: false,
          message: "Internal server error",
          error: error,
        });
      }
}

export const updatePostcodeController = async (req, res) => {
    try {
        const { token } = req.params;
        const decodedToken = await jwtDecode(token);
        const data = decodedToken.value;
        // console.log(data.id);
        const userId = parseInt(data.id);
        const { postcode } = req.body;
        const user_postcode = await prisma.user_metadata.update({
          where: {
            userId: userId,
          },
          data: {
            postcode,
          },
        });
        return res.status(200).send({
          success: true,
          message: "got data successfully",
          data: user_postcode,
        });
      } catch (error) {
        console.log(error);
        return res.status(500).send({
          success: false,
          message: "Internal server error",
          error: error,
        });
      }
}
