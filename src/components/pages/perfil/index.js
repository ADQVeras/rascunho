import React, { useContext, useState } from 'react'
import { AuthContext } from '../../contexts'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { doc, updateDoc } from 'firebase/firestore'
import { db, storage } from '../../firebaseConfig'
import avatarLogo from '../../../assets/avatarLogo.png'

const Perfil = () => {

  const { user, storageUser, setUser, logOut } = useContext(AuthContext)

  const [email, setEmail] = useState(user && user.email)
  const [nome, setNome] = useState(user && user.nome)

  const [imagemUrl, setImagemUrl] = useState(user && user.imagemUrl)
  const [imagem, setImagem] = useState('')

  function handleUpload() {
    const currentUid = user.uid;



    const uploadRef = ref(storage, `Clientes/${currentUid}/${imagem.name}`)

    const uploadTask = uploadBytes(uploadRef, imagem)
      .then((snapshot) => {

        getDownloadURL(snapshot.ref).then(async (downloadURL) => {
          let urlImagem = downloadURL;

          const docRef = doc(db, "Clientes", user.uid)
          await updateDoc(docRef, {
            imagemUrl: urlImagem,
            nome: nome,
          })
            .then(() => {
              let data = {
                ...user,
                nome: nome,
                imagemUrl: urlImagem,
              }

              setUser(data);
              storageUser(data);
              alert("Atualizado com sucesso!")

            })

        })

      })
  }

  function handleFile(e) {
    if (e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type === 'image/jpeg' || image.type === 'image/png') {
        setImagem(image)
        setImagemUrl(URL.createObjectURL(image))
      } else {
        alert("Envie uma imagem do tipo PNG ou JPEG")
        setImagem(null);
        return;
      }


    }
  }


  async function handleSubmit(e) {
    e.preventDefault();

    if (imagem === null && nome !== '') {
      // Atualizar apenas o nome do user
      const docRef = doc(db, "Clientes/", user.uid)
      await updateDoc(docRef, {
        nome: nome,
      })
        .then(() => {
          let data = {
            ...user,
            nome: nome,
          }

          setUser(data);
          storageUser(data);
          alert("Atualizado com sucesso!")

        })

    } else if (nome !== '' && imagem !== '') {
      // Atualizar tanto nome quanto a foto
      handleUpload()
    }

  }


  function handleLogout() {
    logOut()
  }

  return (
    <div>
      <h1>PERFIL</h1>

      <br />

      {imagemUrl === '' ? (
        <img src={avatarLogo} alt="Foto de perfil" width={250} height={250} />
      ) : (
        <img src={imagemUrl} alt="Foto de perfil" width={250} height={250} />
      )}

      <br />

      <input type="file" accept="image/*" onChange={handleFile} /> <br />

      <br />

      <input type="text" value={nome} onChange={(e) => e.target.value} />

      <input type="text" value={email} disabled={true} />

      <br />

      <button onClick={handleSubmit}>Submeter</button>

      <br /><br />

      <button onClick={handleLogout}>Sair</button>

    </div>
  )
}

export default Perfil