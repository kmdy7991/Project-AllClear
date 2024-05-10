from torch import multiprocessing
from ultralytics import YOLO

if __name__ == '__main__':
    multiprocessing.freeze_support()
    # Load a model
    model = YOLO('yolov8n.pt')  # load a pretrained model (recommended for training)

    # Train the model with 2 GPUs
    results = model.train(data='data.yaml', epochs=100)