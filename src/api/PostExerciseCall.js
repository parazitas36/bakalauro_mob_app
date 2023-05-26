import Resources from "../Resources";
import { ApiConstants } from "./ApiConstants";

export const PostExerciseCall = async ({blocks, token, body}) => {
    const formData = new FormData();
    formData.append('ExerciseTypes', String(body.exerciseTypes));
    formData.append('MuscleGroups', String(body.muscleGroups));
    formData.append('Name', String(body.name));
    if (body?.equipmentId !== null) {
        formData.append('EquipmentId', Number(body?.equipmentId ));
    }

    blocks.forEach(block => {
        formData.append('BlockTypes', block.type);
        switch (block.type) {
            case Resources.BlockType.Image:
                formData.append('Files', {
                    uri: String(block.content.uri),
                    type: String(block.content.type),
                    name: String(block.content.fileName)
                });
                break;

            case Resources.BlockType.Text:
                formData.append('Texts',  block.content);
                break;

            case Resources.BlockType.Video:
                formData.append('Files', {
                    uri: String(block.content.uri),
                    type: String(block.content.type),
                    name: String(block.content.fileName)
                });
                break;
        }
    })

    return await fetch(ApiConstants().Exercise_Endpoint, {
        method: 'POST',
        headers: {
            'Accept': "application/json",
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
        },
        body: formData
    });
};