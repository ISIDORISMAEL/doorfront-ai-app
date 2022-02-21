import { useSnackbar } from "notistack";
import React from "react";
import {
  deleteDBImage,
  getMultiImageByIds,
  updateHumanLabels,
} from "../../apis/collectedImage";
import LabelTool from "../../components/LabelTool";
import { ReactToolImageListItemType } from "../../components/LabelTool/state/reactToolState";
import { useQueryImagesStore } from "../../global/queryImagesState";
import { useUserStore } from "../../global/userState";
import { deleteAllLocal } from "../../utils/localStorage";
import { testTypeConfigs } from "./testImageData";
import {
  convertInitImageToInputImageList,
  convertReactToolImageLabelsToDBImageLabels,
} from "./utils/label";
import { useNavigate } from "react-router-dom";
import { deleteImage } from "../../firebase/uploadImage";
import { CollectedImageInterface } from "../../types/collectedImage";
import {
  addLabelImage,
  addUserCredit,
  addUserLabelCredit,
  deleteUnLabelImage,
} from "../../apis/user";

export default function LabelPage() {
  const [state, setState] = React.useState<CollectedImageInterface[]>([]);
  const { queryImageList } = useQueryImagesStore();
  const { userInfo, clearUserInfo } = useUserStore();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function loadFunc() {
      try {
        if (queryImageList.length > 0) {
          const result = await getMultiImageByIds(
            {
              idList: queryImageList.map((item) => item.imageId),
            },
            {
              clearUserInfo,
              navigate,
              deleteAllLocal,
            }
          );
          if (result.code === 0) {
            setState(result.data!);
          }
        } else {
          navigate("/exploration");
        }
      } catch (e) {
        const error = e as Error;
        enqueueSnackbar(error.message, {
          variant: "error",
        });
      }
    }
    loadFunc();
  }, [queryImageList, clearUserInfo, navigate, enqueueSnackbar]);

  const onSubmit = async (image: ReactToolImageListItemType) => {
    try {
      const filterImageList = state.filter(
        (item) => item.image_id === image.imageId
      );
      // Extract images data from response data
      const humanLabelList = filterImageList[0].human_labels;
      const currentImagePov = filterImageList[0].pov;

      // Parse data into certain format required by database
      const newHumanLabels = convertReactToolImageLabelsToDBImageLabels(
        image.labels,
        currentImagePov
      );

      // * Change labelBy form model to current user nickname
      // * Only do this in creating image
      newHumanLabels.forEach((item) => {
        item.labeledBy = userInfo.nickname!;
      });

      // Insert new label list at the head of the array
      humanLabelList.unshift({
        name: userInfo.nickname || "Nobody",
        labels: newHumanLabels,
      });

      // Send back to Database
      const result = await updateHumanLabels(
        {
          imageId: image.imageId,
          data: humanLabelList,
        },
        {
          clearUserInfo,
          navigate,
          deleteAllLocal,
        }
      );
      if (result.code === 0) {
        //TODO Handle QueryImages
        // Delete state
        // setState(state.filter((item) => item.image_id !== image.imageId));
        //TODO Delete UnLabelImage property
        await deleteUnLabelImage({
          id: userInfo.id!,
          data: {
            imageId: image.imageId,
            fileName: image.fileName,
            imgSrc: image.imgSrc,
          },
        });
        //TODO Add LabelImage property
        await addLabelImage({
          id: userInfo.id!,
          data: {
            imageId: image.imageId,
            fileName: image.fileName,
            imgSrc: image.imgSrc,
          },
        });

        // * Handle User Credits
        // add create credit
        await addUserCredit({ id: userInfo.id!, type: "create" });
        // add label credit
        await addUserLabelCredit({
          id: userInfo.id!,
          labelNum: newHumanLabels.length,
        });

        enqueueSnackbar("Save successfully", {
          variant: "success",
        });
      }
    } catch (e) {
      const error = e as Error;
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    }
  };

  const onFailureExit = () => {
    enqueueSnackbar("Before you exit, save all corrections.", {
      variant: "error",
    });
  };

  const onSuccessExit = () => {
    navigate("/exploration");
  };

  /* ---------------- Handle Delete Function Within Label Tool ---------------- */
  const onDeleteImage = async (image: ReactToolImageListItemType) => {
    try {
      //TODO Delete database image
      await deleteDBImage(
        { imageId: image.imageId },
        {
          clearUserInfo,
          navigate,
          deleteAllLocal,
        }
      );
      //TODO Delete UnLabelImage property
      await deleteUnLabelImage({
        id: userInfo.id!,
        data: {
          imageId: image.imageId,
          fileName: image.fileName,
          imgSrc: image.imgSrc,
        },
      });
      // Notification
      enqueueSnackbar("Delete image successfully", {
        variant: "warning",
      });

      //TODO Delete firebase storage image
      await deleteImage(image.fileName);
    } catch (e) {
      const error = e as Error;
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    }
  };

  return (
    <>
      {state && state.length > 0 && (
        <LabelTool
          collectedImageList={convertInitImageToInputImageList(state)}
          typeConfigs={testTypeConfigs}
          operations={{
            onSubmitImage: onSubmit,
            onFailureExit,
            onSuccessExit,
            onDeleteImage,
          }}
        />
      )}
    </>
  );
}
