import prisma from "../../prisma/client";

export async function getUser(req: any, res: any) {
  const { skip } = req.query;
  const skipValue = skip ? Number(skip) : 0;

  try {
    let user = await prisma.user.findMany({
      skip: skipValue,
      select: {
        UserID: true,
        NamaLengkap: true,
        Alamat: true,
        Username: true,
        Email: true,
      },
    });

    let count = await prisma.user.count();

    res.status(200).json({
      message: "User found successfully",
      total: count,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
}

export async function getUserId(req: any, res: any) {
  interface userData {
    uid: number;
  }

  const { uid } = req.query as userData;

  try {
    let user = await prisma.user.findUnique({
      where: {
        UserID: uid,
      },
      include: {
        Profile: true,
      },
    });

    res.status(200).json({
      message: "User found successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
}

export async function createUser(req: any, res: any) {
  interface userData {
    namaLengkap: string;
    username: string;
    alamat: string;
    email: string;
    password: string;
  }

  const { namaLengkap, username, alamat, email, password } =
    req.body as userData;

  try {
    let user = await prisma.user.create({
      data: {
        Username: username,
        Email: email,
        NamaLengkap: namaLengkap,
        Alamat: alamat,
        Password: password,
      },
    });

    res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
}

export async function updateUser(req: any, res: any) {
  interface userData {
    namaLengkap: string;
    username: string;
    alamat: string;
    email: string;
    password: string;
    role: any;
  }

  const { namaLengkap, username, email, alamat, password, role } =
    req.body as userData;
  const { uid } = req.query;

  try {
    let user = await prisma.user.update({
      where: {
        UserID: Number(uid),
      },
      data: {
        NamaLengkap: namaLengkap,
        Username: username,
        Email: email,
        Alamat: alamat,
        Password: password,
        Role: role,
      },
    });

    res.status(201).json({
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
}

export async function deleteUser(req: any, res: any) {
  const { uid } = req.query;

  try {
    const userData = await prisma.user.delete({
      where: {
        UserID: Number(uid),
      },
    });

    res.status(201).json({
      message: "User deleted successfully",
      data: userData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
}
