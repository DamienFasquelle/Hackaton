import React, { useEffect, useState } from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import Swal from "sweetalert2";

const AdminValidatePhoto = () => {
    const [images, setImages] = useState([]);

    const fetchValidePhoto = async () => {
        try {
            const responseApi = await fetch("http://localhost:3000/api/picture");
            if (!responseApi.ok) {
                throw new Error("Erreur lors de la récupération des données");
            }
            const responseApiJson = await responseApi.json();
            setImages(responseApiJson.data);
        } catch (error) {
            console.error("Une erreur s'est produite :", error);
        }
    };

    const handleValidation = async (id) => {
        try {
            const responseApi = await fetch(`http://localhost:3000/api/picture/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ status: 'publié' }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (responseApi.ok) {
                Swal.fire({
                    title: 'Valider',
                    text: "image publié",
                    icon: 'success',
                });
                setTimeout(() => {
                    window.location.reload();
                }, 3000);

            } else {
                Swal.fire({
                    title: 'Erreur!',
                    text: "Erreur lors du rejet de l'image",
                    icon: 'error',
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Erreur!',
                text: "Une erreur s'est produite lors de la validation de l'image :", error,
                icon: 'error',
            });
        }
    };

    const handleDismiss = async (id) => {
        try {
            const responseApi = await fetch(`http://localhost:3000/api/picture/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ status: 'rejeté' }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (responseApi.ok) {
                Swal.fire({
                    title: 'Valider',
                    text: "image rejeté",
                    icon: 'success',
                });
                setTimeout(() => {
                    window.location.reload();
                }, 3000);

            } else {
                Swal.fire({
                    title: 'Erreur!',
                    text: "Erreur lors du rejet de l'image",
                    icon: 'error',
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Erreur!',
                text: "Une erreur s'est produite lors de la validation de l'image :", error,
                icon: 'error',
            })
        };
    }
    const imagesNonPubliees = images.filter((image) => image.status === "non publié");


    useEffect(() => {
        fetchValidePhoto();
    }, []);

    return (
        <>
            <AdminHeader />
            <div>
                <h1>Photos en attente de vérification</h1>
                {imagesNonPubliees.length === 0 ? (
                    <p>Pas de photo à valider</p>
                ) : (
                    imagesNonPubliees.map((image) => (
                        <div key={image.id}>
                            <img src={image.link} alt={image.description} />
                            <button onClick={() => handleValidation(image.id)}>Valider</button>
                            <button onClick={() => handleDismiss(image.id)}>Rejeter</button>
                        </div>
                    ))
                )}
            </div>
        </>
    );
};

export default AdminValidatePhoto;
