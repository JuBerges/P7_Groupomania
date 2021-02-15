<template>
    <div class="help pt-11 mb-36">
        <div>
            <main>
                <div class="flex-col my-6">
                    <h2 class="text-gray-100 text-2xl font-bold text-center sm:text-3xl mx-10">
                        Bienvenue sur l'application Groupomania
                    </h2>
                </div>
                <div>
                    <p class="my-blue text-center my-6 text-xl font-bold">
                        FAQ - Questions fréquentes
                    </p>
                </div>
                <div class="sm:w-2/4 sm:mx-auto mx-4 my-12">
                    <details class="mb-10 cursor-pointer">
                        <summary class="font-semibold bg-gray-200 rounded-md py-2 px-4">
                            Comment supprimer une publication ?
                        </summary>
                        <span class="text-gray-200">
                            <br />
                            <p class="my-blue">Si vous êtes l'auteur de la publication :</p>
                            - il vous suffit de cliquer sur la petite îcone de corbeille et de
                            valider votre choix. <br />
                            <p class="my-blue">Si vous n'en n'êtes pas l'auteur :</p>
                            - Si un contenu vous paraît offensant ou dérengeant prevenez nous
                            en cliquant
                            <a class="my-blue" target="_blank" href="mailto:nullepart@groupomania.org">ici</a>.
                        </span>
                    </details>
                    <details class="mb-10 cursor-pointer">
                        <summary class="font-semibold bg-gray-200 rounded-md py-2 px-4">
                            Comment mettre à jour une publication ?
                        </summary>
                        <span class="text-gray-200">
                            <br />
                            <p class="text-gray-200">
                                Si vous êtes l'auteur de la publication, vous pouvez voir
                                apparître une petite icône en forme de crayon juste à côté du
                                titre de votre publication. <br />
                                En cliquant sur cette icône un formulaire apparaîtra, vous
                                permettant ainsi de mofifier votre publication.
                            </p>
                        </span>
                    </details>
                    <details class="mb-10 cursor-pointer">
                        <summary class="font-semibold bg-gray-200 rounded-md py-2 px-4">
                            Comment changer d'avatar ?
                        </summary>
                        <span class="text-gray-200">
                            <br />
                            Pour changer d'avatar, il vous suffit de vous rendre sur la page
                            de votre profil en cliquant sur l'onglet central de la bar de
                            navigation, de cliquer sur le bouton "Cliquez ici pour changer
                            d'avatar", selectionner une de vos images préférées et de valider
                            en cliquant sur le bouton "Valider le changement".
                        </span>
                    </details>
                    <details class="mb-10 cursor-pointer">
                        <summary class="font-semibold bg-gray-200 rounded-md py-2 px-4">
                            À quoi ressemblera la prochaine version de l'appli ?
                        </summary>
                        <span class="text-gray-200">
                            <br />
                            L'application va continer à évoluer et intégrer de nouvelles
                            fonctionalitées au fil du temps, nous publiront des sondages ici
                            afin de savoir quels changements sont les plus attendus.
                        </span>
                    </details>
                    <details class="mb-10 cursor-pointer">
                        <summary class="font-semibold bg-gray-200 rounded-md py-2 px-4">
                            Comment nous contacter ?
                        </summary>
                        <span class="text-gray-200"><br />
                            Pour nous contacter cliquez
                            <a class="my-blue" target="_blank" href="mailto:nullepart@groupomania.org">ici</a>.
                        </span>
                    </details>
                </div>
            </main>
        </div>
    </div>
</template>
<script>
export default {
    name: "Help",
    components: {},
};
</script>